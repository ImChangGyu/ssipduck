'use client';

import { FieldValues } from 'react-hook-form';
import { Form, Search } from '~/components/ui/form';

interface SearchAniProps {
  onSubmit: (values: FieldValues) => void;
}

export default function SearchAni({ onSubmit }: SearchAniProps) {
  return (
    <div className="w-full px-[3%] md:px-[5%] pt-[40px] pb-[20px]">
      <Form onSubmit={onSubmit}>
        {({ register }) => <Search register={register('search')} />}
      </Form>
    </div>
  );
}
