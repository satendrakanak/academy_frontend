"use client";

import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { FieldGroup } from "@/components/ui/field";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Textarea } from "../ui/textarea";
import { useLocation } from "@/hooks/use-location";
import { useUserCountry } from "@/context/user-country-context";

export const CheckoutForm = () => {
  const { userCountry } = useUserCountry();
  const { control, setValue, watch } = useFormContext();
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectCountry,
    selectState,
    selectCity,
  } = useLocation();
  const countryValue = watch("country");
  const stateValue = watch("state");
  const cityValue = watch("city");

  // Set default country from user location
  useEffect(() => {
    if (userCountry && countries.length > 0 && !selectedCountry) {
      const country = countries.find((c) => c.countryCode === userCountry);
      if (country) {
        selectCountry(country);
        setValue("country", country.name);
      }
    }
  }, [countries, selectedCountry, setValue, selectCountry, userCountry]);

  useEffect(() => {
    if (!countryValue || selectedCountry || countries.length === 0) return;
    const country = countries.find((item) => item.name === countryValue);
    if (!country) return;
    selectCountry(country);
    setValue("country", country.name);
  }, [countries, countryValue, selectedCountry, selectCountry, setValue]);

  useEffect(() => {
    if (!stateValue || selectedState || states.length === 0) return;
    const state = states.find((item) => item.name === stateValue);
    if (!state) return;
    selectState(state);
    setValue("state", state.name);
  }, [selectedState, selectState, setValue, stateValue, states]);

  useEffect(() => {
    if (!cityValue || cities.length === 0) return;
    const city = cities.find((item) => item.name === cityValue);
    if (!city) return;
    selectCity(city);
  }, [cities, cityValue, selectCity]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Billing Address</h2>

      <FieldGroup>
        {/* First + Last */}
        <div className="grid md:grid-cols-2 gap-5">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="First Name"
                className="h-11 w-full"
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Last Name"
                className="h-11 w-full"
              />
            )}
          />
        </div>
        {/* Email + Phone */}
        <div className="grid md:grid-cols-2 gap-5">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Email" className="h-11 w-full" />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Phone Number"
                className="h-11 w-full"
              />
            )}
          />
        </div>

        {/* Address */}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Full Address"
              className="h-20 w-full"
            />
          )}
        />

        {/* Country + State */}
        <div className="grid md:grid-cols-2 gap-5">
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => {
                  const country = countries.find((c) => c.name === val);
                  if (country) {
                    selectCountry(country);
                    setValue("country", country.name);
                  }
                }}
              >
                <SelectTrigger className="h-11! w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>

                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val); // 🔥 important

                  const state = states.find((s) => s.name === val);

                  if (state) {
                    selectState(state);
                    setValue("state", state.name);
                  }
                }}
                disabled={!selectedCountry}
              >
                <SelectTrigger className="h-11! w-full">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>

                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* City + Pincode */}
        <div className="grid md:grid-cols-2 gap-5">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!selectedState}
              >
                <SelectTrigger className="h-11! w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>

                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Pincode" className="h-11 w-full" />
            )}
          />
        </div>
      </FieldGroup>
    </div>
  );
};
