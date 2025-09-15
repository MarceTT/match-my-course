"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormValues, categorySchema } from "./categorySchema";
import { slugify } from "@/app/utils/slugify";
import axiosInstance from "@/app/utils/apiClient";
import { useEffect } from "react";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CategoryForm({ category, onSave }: { category?: any; onSave?: () => void }) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      metaTitle: category?.metaTitle || "",
      metaDescription: category?.metaDescription || "",
    },
  });

  const name = form.watch("name");
  useEffect(() => {
    if (!category) {
      form.setValue("slug", slugify(name));
    }
  }, [name, category, form]);

  const onSubmit = async (values: CategoryFormValues) => {
    if (category) {
      await axiosInstance.put(`/blog/category/${category._id}`, values);
    } else {
      await axiosInstance.post(`/blog/category`, values);
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
                  <FormControl><Input {...field} placeholder="Ej: Desarrollo Web" /></FormControl>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl><Textarea {...field} placeholder="Descripción corta de la categoría" /></FormControl>
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
              {category ? "Actualizar Categoría" : "Crear Categoría"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
