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
import { Service } from "@prisma/client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormattedService } from "@/app/types";

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  description: z.string().min(1),
});

type ServiceFormValues = z.infer<typeof formSchema>;

interface ServiceFormProps {
  initialData: FormattedService;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const router = useRouter();

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      }
    : {
        name: "",
        price: 0,
        description: "",
      };

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const toastMessage = "success baby you will get it";

  const onSubmit = async (data: ServiceFormValues) => {
    try {
      setLoading(true);
      // if (initialData) {
      //   await axios.patch(`/api/services/${params.serviceId}`, data);
      // } else {
      await axios.post(`/api/services`, data);
      // }
      toast.success(toastMessage);
      router.refresh();
      window.location.reload();
    } catch (error: any) {
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ps-3">Service Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Service name"
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
                <FormLabel className="ps-3">Service Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Service Price"
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
                <FormLabel className="ps-3">Service Description</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Service Description"
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
