'use client';

import { Form, Search } from '~/components/ui/form';

export default function SearchAni() {
  return (
    <div className="w-full px-[3%] md:px-[5%] pt-[40px] pb-[20px]">
      <Form onSubmit={(values) => console.log(values)}>
        {({ register }) => <Search register={register('search')} />}
      </Form>
    </div>
  );
}
