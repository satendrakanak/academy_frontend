"use client";

import { useState } from "react";
import { User } from "@/types/user";
import { EditableField } from "./editable-field";
import { SwitchRow } from "./switch-row";
import { profileClientService } from "@/services/users/profile.client";
import { toast } from "sonner";

interface ProfileViewProps {
  user: User;
}

export default function ProfileView({ user }: ProfileViewProps) {
  const [data, setData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);

  const handleProfileSave = async () => {
    try {
      setLoading(true);

      await profileClientService.updateProfile({
        bio: data.profile?.bio,
        location: data.profile?.location,
        website: data.profile?.website,
        isPublic: data.profile?.isPublic,
        showCourses: data.profile?.showCourses,
        showCertificates: data.profile?.showCertificates,
      });

      setDirty(false);
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* 🔵 BASIC INFO */}
      <div className="bg-white rounded-2xl border p-5">
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Basic Information
        </h3>

        <div className="divide-y">
          <EditableField
            userId={user.id}
            label="First Name"
            value={data.firstName}
            field="firstName"
            onUpdated={(val) => setData({ ...data, firstName: val })}
          />

          <EditableField
            userId={user.id}
            label="Last Name"
            value={data.lastName || ""}
            field="lastName"
            onUpdated={(val) => setData({ ...data, lastName: val })}
          />

          <EditableField
            userId={user.id}
            label="User Name"
            value={data.username || ""}
            field="userName"
            onUpdated={(val) => setData({ ...data, username: val })}
            editable={false}
          />

          <EditableField
            userId={user.id}
            label="Email"
            value={data.email}
            field="email"
            onUpdated={(val) => setData({ ...data, email: val })}
            editable={false}
          />

          <EditableField
            userId={user.id}
            label="Phone Number"
            value={data.phoneNumber}
            field="phoneNumber"
            onUpdated={(val) => setData({ ...data, phoneNumber: val })}
            editable={false}
          />
        </div>
      </div>

      {/* 🟣 PROFILE DETAILS */}
      <div className="bg-white rounded-2xl border p-5">
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Profile Details
        </h3>

        <div className="space-y-4">
          {/* BIO */}
          <div>
            <label className="text-xs text-gray-400">Bio</label>
            <textarea
              value={data.profile?.bio || ""}
              onChange={(e) => {
                setDirty(true);
                setData({
                  ...data,
                  profile: {
                    ...data.profile,
                    bio: e.target.value,
                  },
                });
              }}
              className="w-full mt-1 text-sm bg-gray-100 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-xs text-gray-400">Location</label>
            <input
              value={data.profile?.location || ""}
              onChange={(e) => {
                setDirty(true);
                setData({
                  ...data,
                  profile: {
                    ...data.profile,
                    location: e.target.value,
                  },
                });
              }}
              className="w-full mt-1 text-sm bg-gray-100 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* WEBSITE */}
          <div>
            <label className="text-xs text-gray-400">Website</label>
            <input
              value={data.profile?.website || ""}
              onChange={(e) => {
                setDirty(true);
                setData({
                  ...data,
                  profile: {
                    ...data.profile,
                    website: e.target.value,
                  },
                });
              }}
              className="w-full mt-1 text-sm bg-gray-100 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
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
    </div>
  );
}
