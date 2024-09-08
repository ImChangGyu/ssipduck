import Ani from '~/features/ani/components/ani';
import { VariableType } from '~/types/ani';

interface AniPageProps {
  params: { ani_variable_type: VariableType };
}

export default function AniPage({
  params: { ani_variable_type },
}: AniPageProps) {
  return <Ani variableType={ani_variable_type} />;
}
