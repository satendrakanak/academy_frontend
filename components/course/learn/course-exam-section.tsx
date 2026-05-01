"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { courseExamsClientService } from "@/services/course-exams/course-exams.client";
import { Course, CourseExamAttempt, CourseExamLearnerPayload } from "@/types/course";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/error-handler";

interface CourseExamSectionProps {
  course: Course;
}

export function CourseExamSection({ course }: CourseExamSectionProps) {
  const [payload, setPayload] = useState<CourseExamLearnerPayload | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string[]>
  >({});
  const [answerTexts, setAnswerTexts] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [draggedOptionId, setDraggedOptionId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setIsLoading(true);
        const response = await courseExamsClientService.getForCourse(course.id);
        if (!mounted) return;

        setPayload(response.data);
      } catch (error: unknown) {
        if (!mounted) return;
        toast.error(getErrorMessage(error));
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [course.id]);

  useEffect(() => {
    if (!payload?.canAttempt || !payload.exam.timeLimitMinutes) {
      setTimeRemaining(null);
      return;
    }

    setTimeRemaining(payload.exam.timeLimitMinutes * 60);

    const timer = window.setInterval(() => {
      setTimeRemaining((current) => {
        if (current === null) return current;
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [payload?.canAttempt, payload?.exam.timeLimitMinutes]);

  const questions = useMemo(() => payload?.exam.questions ?? [], [payload]);
  const totalMarks = useMemo(
    () => questions.reduce((sum, question) => sum + question.points, 0),
    [questions],
  );

  const handleOptionToggle = (
    questionId: string,
    optionId: string,
    type: "single" | "multiple" | "true_false",
  ) => {
    setSelectedAnswers((prev) => {
      if (type === "multiple") {
        const current = prev[questionId] ?? [];
        return {
          ...prev,
          [questionId]: current.includes(optionId)
            ? current.filter((value) => value !== optionId)
            : [...current, optionId],
        };
      }

      return {
        ...prev,
        [questionId]: [optionId],
      };
    });
  };

  useEffect(() => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      let changed = false;

      for (const question of questions) {
        if (question.type === "drag_drop" && !next[question.id]?.length) {
          next[question.id] = shuffleArray(question.options.map((option) => option.id));
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [questions]);

  const handleSubmit = useCallback(async (force = false) => {
    if (!payload) return;

    const answers = questions.map((question) => ({
      questionId: question.id,
      selectedOptionIds: selectedAnswers[question.id] ?? [],
      answerText: answerTexts[question.id]?.trim() || undefined,
    }));

    const unanswered = answers.filter((answer) => {
      const question = questions.find((item) => item.id === answer.questionId);
      if (!question) return false;

      if (question.type === "short_text") {
        return !answer.answerText;
      }

      return !answer.selectedOptionIds.length;
    });
    if (unanswered.length && !force) {
      toast.error("Please answer every question before submitting the exam.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await courseExamsClientService.submitAttempt(
        course.id,
        answers,
      );

      const latestAttempt = response.data;
      setPayload((prev) =>
        prev
          ? {
              ...prev,
              latestAttempt,
              attempts: latestAttempt
                ? [latestAttempt, ...prev.attempts]
                : prev.attempts,
              attemptsUsed: prev.attemptsUsed + 1,
              attemptsRemaining:
                prev.attemptsRemaining === null
                  ? null
                  : Math.max(prev.attemptsRemaining - 1, 0),
              canAttempt:
                !!latestAttempt &&
                !latestAttempt.passed &&
                (prev.attemptsRemaining === null || prev.attemptsRemaining > 1),
              isPassed: !!latestAttempt?.passed,
              passedAttempt: latestAttempt?.passed
                ? latestAttempt
                : prev.passedAttempt,
            }
          : prev,
      );
      setTimeRemaining(null);
      setSelectedAnswers({});
      setAnswerTexts({});
      toast.success(
        latestAttempt?.passed
          ? "Excellent. You cleared the exam."
          : "Exam submitted. Review your score below.",
      );
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }, [answerTexts, course.id, payload, questions, selectedAnswers]);

  useEffect(() => {
    if (timeRemaining === 0 && payload?.canAttempt && !isSubmitting) {
      void handleSubmit(true);
    }
  }, [handleSubmit, isSubmitting, payload?.canAttempt, timeRemaining]);

  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-sm text-slate-500">
        Loading exam workspace...
      </div>
    );
  }

  if (!payload) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-sm text-slate-500">
        Final exam is not available for this course yet.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_50px_-40px_rgba(15,23,42,0.22)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-700)]">
              Final exam
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              {payload.exam.title}
            </h3>
            {payload.exam.description ? (
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                {payload.exam.description}
              </p>
            ) : null}
            {payload.exam.instructions ? (
              <div className="mt-4 rounded-2xl border border-[var(--brand-100)] bg-[var(--brand-50)]/70 px-4 py-3 text-sm leading-6 text-slate-700">
                {payload.exam.instructions}
              </div>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
            <MetricCard label="Pass mark" value={`${payload.exam.passingPercentage}%`} />
            <MetricCard label="Attempts used" value={`${payload.attemptsUsed}`} />
            <MetricCard label="Attempts left" value={payload.attemptsRemaining ?? "Unlimited"} />
            <MetricCard label="Total marks" value={`${totalMarks}`} />
            {payload.exam.timeLimitMinutes ? (
              <MetricCard
                label="Time left"
                value={formatSeconds(timeRemaining ?? payload.exam.timeLimitMinutes * 60)}
              />
            ) : null}
          </div>
        </div>
      </div>

      {payload.latestAttempt ? (
        <AttemptSummaryCard attempt={payload.latestAttempt} />
      ) : null}

      {payload.canAttempt ? (
        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_50px_-40px_rgba(15,23,42,0.22)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-slate-950">
                Attempt your exam
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Answer every question carefully. Certificate unlocks only after
                a passing result.
              </p>
            </div>

            <Button
              type="button"
              size="lg"
              className="rounded-2xl px-6"
              disabled={isSubmitting}
              onClick={() => void handleSubmit()}
            >
              {isSubmitting ? "Submitting..." : "Submit exam"}
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const selected = selectedAnswers[question.id] ?? [];

              return (
                <div
                  key={question.id}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
                        Question {index + 1}
                      </p>
                      <h5 className="mt-2 text-base font-semibold text-slate-950">
                        {question.prompt}
                      </h5>
                    </div>

                    <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {question.points} mark{question.points > 1 ? "s" : ""}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {question.type === "short_text" ? (
                      <textarea
                        value={answerTexts[question.id] ?? ""}
                        onChange={(event) =>
                          setAnswerTexts((prev) => ({
                            ...prev,
                            [question.id]: event.target.value,
                          }))
                        }
                        className="min-h-28 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-0 transition focus:border-[var(--brand-300)]"
                        placeholder="Write your answer in one short line or sentence."
                      />
                    ) : question.type === "drag_drop" ? (
                      <div className="space-y-3">
                        {(selectedAnswers[question.id] ?? []).map((optionId, orderIndex) => {
                          const option = question.options.find((item) => item.id === optionId);
                          if (!option) return null;

                          return (
                            <div
                              key={option.id}
                              draggable
                              onDragStart={() => setDraggedOptionId(option.id)}
                              onDragEnd={() => setDraggedOptionId(null)}
                              onDragOver={(event) => event.preventDefault()}
                              onDrop={() =>
                                setSelectedAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: reorderItems(
                                    prev[question.id] ?? [],
                                    draggedOptionId,
                                    option.id,
                                  ),
                                }))
                              }
                              className="flex cursor-move items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                            >
                              <div className="flex size-8 items-center justify-center rounded-full bg-[var(--brand-50)] text-xs font-semibold text-[var(--brand-700)]">
                                {orderIndex + 1}
                              </div>
                              <span className="text-sm leading-6 text-slate-700">
                                {option.text}
                              </span>
                            </div>
                          );
                        })}
                        <p className="text-xs text-slate-500">
                          Drag items into the correct order.
                        </p>
                      </div>
                    ) : (
                      question.options.map((option) => {
                        const checked = selected.includes(option.id);

                        return (
                          <label
                            key={option.id}
                            className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                              checked
                                ? "border-[var(--brand-300)] bg-[var(--brand-50)]/70"
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            <input
                              type={question.type === "multiple" ? "checkbox" : "radio"}
                              name={question.id}
                              checked={checked}
                              onChange={() =>
                                handleOptionToggle(
                                  question.id,
                                  option.id,
                                  question.type,
                                )
                              }
                              className="mt-0.5 size-4 accent-[var(--brand-600)]"
                            />
                            <span className="text-sm leading-6 text-slate-700">
                              {option.text}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600 shadow-[0_24px_50px_-40px_rgba(15,23,42,0.22)]">
          {payload.isPassed
            ? "You have already cleared this exam. Your certificate can now be generated from the overview tab once lecture completion is also done."
            : "You have exhausted the allowed attempts for this exam. Please contact the academy team if a retake needs to be enabled."}
        </div>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function shuffleArray(items: string[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function reorderItems(items: string[], sourceId: string | null, targetId: string) {
  if (!sourceId || sourceId === targetId) {
    return items;
  }

  const next = [...items];
  const sourceIndex = next.indexOf(sourceId);
  const targetIndex = next.indexOf(targetId);

  if (sourceIndex === -1 || targetIndex === -1) {
    return items;
  }

  const [moved] = next.splice(sourceIndex, 1);
  next.splice(targetIndex, 0, moved);
  return next;
}

function AttemptSummaryCard({ attempt }: { attempt: CourseExamAttempt }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_50px_-40px_rgba(15,23,42,0.22)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
            Latest result
          </p>
          <h4 className="mt-2 text-xl font-semibold text-slate-950">
            Attempt {attempt.attemptNumber} {attempt.passed ? "passed" : "submitted"}
          </h4>
          <p className="mt-2 text-sm text-slate-500">
            Score {attempt.score}/{attempt.maxScore} • {attempt.percentage}% •{" "}
            {attempt.submittedAt
              ? new Date(attempt.submittedAt).toLocaleString()
              : "Awaiting evaluation"}
          </p>
        </div>

        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            attempt.passed
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {attempt.passed ? "Passed" : "Needs improvement"}
        </div>
      </div>
    </div>
  );
}
