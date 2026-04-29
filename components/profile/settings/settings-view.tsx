"use client";

import { useState } from "react";
import { User } from "@/types/user";
import { profileClientService } from "@/services/users/profile.client";
import { toast } from "sonner";
import { SwitchRow } from "../switch-row";
import { userClientService } from "@/services/users/user.client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordForm } from "./change-password-form";

interface ProfileViewProps {
  user: User;
}

export default function SettingsView({ user }: ProfileViewProps) {
  const [data, setData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);

  const handleProfileSave = async () => {
    try {
      setLoading(true);

      await profileClientService.updateProfile({
        isPublic: data.profile?.isPublic,
        showCourses: data.profile?.showCourses,
        showCertificates: data.profile?.showCertificates,
      });

      setDirty(false);
      toast.success("Settings updated");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* 🟡 PRIVACY SETTINGS */}
      <div className="bg-white rounded-2xl border p-5">
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Privacy Settings
        </h3>

        <div className="space-y-4">
          <SwitchRow
            label="Public Profile"
            checked={data.profile?.isPublic}
            onChange={(val) => {
              setDirty(true);
              setData({
                ...data,
                profile: { ...data.profile, isPublic: val },
              });
            }}
          />

          <SwitchRow
            label="Show Courses"
            checked={data.profile?.showCourses}
            onChange={(val) => {
              setDirty(true);
              setData({
                ...data,
                profile: { ...data.profile, showCourses: val },
              });
            }}
          />

          <SwitchRow
            label="Show Certificates"
            checked={data.profile?.showCertificates}
            onChange={(val) => {
              setDirty(true);
              setData({
                ...data,
                profile: { ...data.profile, showCertificates: val },
              });
            }}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleProfileSave}
          disabled={!dirty || loading}
          className="bg-primary text-white px-4 cursor-pointer py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
