"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagFormValues, tagSchema } from "./tagSchema";
import { slugify } from "@/app/utils/slugify";
import axiosInstance from "@/app/utils/axiosInterceptor";
import { useEffect } from "react";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TagForm({ tag, onSave }: { tag?: any; onSave?: () => void }) {
  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: tag?.name || "",
      slug: tag?.slug || "",
      metaTitle: tag?.metaTitle || "",
      metaDescription: tag?.metaDescription || "",
    },
  });

  const name = form.watch("name");
  useEffect(() => {
    if (!tag) {
      form.setValue("slug", slugify(name));
    }
  }, [name, tag, form]);

  const onSubmit = async (values: TagFormValues) => {
    if (tag) {
      await axiosInstance.put(`/blog/tag/${tag._id}`, values);
    } else {
      await axiosInstance.post(`/blog/tag`, values);
    }
    if (onSave) onSave();
  };

  return (
    <Card className="w-full p-6">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl><Input {...field} placeholder="Ej: React, Node.js" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl><Input {...field} readOnly /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title (SEO)</FormLabel>
                  <FormControl><Input {...field} placeholder="Título SEO (opcional)" /></FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description (SEO)</FormLabel>
                  <FormControl><Textarea {...field} placeholder="Descripción SEO (opcional)" /></FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {tag ? "Actualizar Tag" : "Crear Tag"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
