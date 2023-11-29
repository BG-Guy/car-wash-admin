"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Automobile } from "@prisma/client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AutomobileColumn } from "./column";

const formSchema = z.object({
  type: z.string().min(1),
  price: z.coerce.number().min(1),
  description: z.string().min(1),
});

type AutomobileFormValues = z.infer<typeof formSchema>;

interface AutomobileFormProps {
  initialData: AutomobileColumn;
}

export const AutomobileForm: React.FC<AutomobileFormProps> = ({
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const router = useRouter();

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      }
    : {
        type: "",
        price: 0,
        description: "",
      };

  const form = useForm<AutomobileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const toastMessage = "success baby you will get it";

  const onSubmit = async (data: AutomobileFormValues) => {
    try {
      setLoading(true);
      // if (initialData) {
      //   await axios.patch(`/api/services/${params.serviceId}`, data);
      // } else {
      console.log("🚀 ~ file: automobile-form.tsx:68 ~ onSubmit ~ data:", data);
      await axios.post(`/api/automobiles`, data);
      // }
      toast.success(toastMessage);
      router.refresh();
      window.location.reload();
    } catch (error: any) {
      console.log("🚀 ~ file: automobile-form.tsx:72 ~ onSubmit ~ data:", data);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="md:grid md:grid-cols-4 gap-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ps-3">Automobile Type</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Automobile type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price" // changed the name to "price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ps-3">Automobile Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Automobile Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ps-3">Automobile Description</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Automobile Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="w-36 mt-6 md:mt-auto"
            type="submit"
          >
            Add New
          </Button>
        </div>
      </form>
    </Form>
  );
};
