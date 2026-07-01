'use client';

import { useEffect, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, ModalBackdrop, ModalBody, ModalContainer, ModalDialog, ModalFooter, ModalHeader } from '@heroui/react';

import { companySchema, type CompanySchema } from '@/features/companies/schemas/company-schema';

interface CreateCompanyModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: CompanySchema) => Promise<void> | void;
  defaultValues?: Partial<CompanySchema>;
  title?: string;
}

const defaultFormValues: CompanySchema = {
  name: '',
  responsibleEmail: '',
};

function normalizeDefaultValues(defaultValues?: Partial<CompanySchema>): CompanySchema {
  return {
    name: defaultValues?.name ?? defaultFormValues.name,
    responsibleEmail: defaultValues?.responsibleEmail ?? defaultFormValues.responsibleEmail,
  };
}

export function CreateCompanyModal({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultValues,
  title = 'Nova empresa',
}: CreateCompanyModalProps) {
  const nameInputId = useId();
  const responsibleEmailInputId = useId();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    defaultValues: normalizeDefaultValues(defaultValues),
  });

  useEffect(() => {
    if (isOpen) {
      reset(normalizeDefaultValues(defaultValues));
    }
  }, [defaultValues, isOpen, reset]);

  async function handleFormSubmit(values: CompanySchema) {
    await onSubmit(values);
    onOpenChange(false);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContainer placement="center" size="md" scroll="inside">
        <ModalBackdrop variant="blur" />
        <ModalDialog className="border border-white/10 bg-[#2a2a2a] text-foreground">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label htmlFor={nameInputId} className="text-sm font-medium text-foreground">
                      Nome da empresa
                    </label>
                    <Input
                      {...field}
                      id={nameInputId}
                      placeholder="Digite o nome da empresa"
                      fullWidth
                      variant="secondary"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? `${nameInputId}-error` : undefined}
                    />
                    {errors.name?.message ? (
                      <p id={`${nameInputId}-error`} className="text-sm text-red-300">
                        {errors.name.message}
                      </p>
                    ) : null}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="responsibleEmail"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label htmlFor={responsibleEmailInputId} className="text-sm font-medium text-foreground">
                      E-mail do responsável
                    </label>
                    <Input
                      {...field}
                      id={responsibleEmailInputId}
                      type="email"
                      placeholder="Digite o e-mail do responsável"
                      fullWidth
                      variant="secondary"
                      aria-invalid={Boolean(errors.responsibleEmail)}
                      aria-describedby={errors.responsibleEmail ? `${responsibleEmailInputId}-error` : undefined}
                    />
                    {errors.responsibleEmail?.message ? (
                      <p id={`${responsibleEmailInputId}-error`} className="text-sm text-red-300">
                        {errors.responsibleEmail.message}
                      </p>
                    ) : null}
                  </div>
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="button" variant="outline" onPress={() => onOpenChange(false)} isDisabled={isSubmitting}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" isDisabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </ModalFooter>
          </form>
        </ModalDialog>
      </ModalContainer>
    </Modal>
  );
}