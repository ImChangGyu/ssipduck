import { UseFormRegisterReturn } from 'react-hook-form';
import * as SVG from '~/assets/svg';
import { Input } from '~/components/ui/form';

interface SearchProps {
  register: UseFormRegisterReturn;
}

export default function Search({ register }: SearchProps) {
  return (
    <div className="relative">
      <SVG.Magnifier className="absolute top-[18px] left-[20px]" />
      <Input
        placeholder="검색어를 입력해주세요"
        className="pl-[50px]"
        register={register}
      />
    </div>
  );
}
