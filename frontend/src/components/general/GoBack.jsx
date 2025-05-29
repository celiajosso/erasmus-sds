import { useNavigate } from 'react-router-dom';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <button
      className="absolute top-6 left-6 btn btn-circle btn-secondary"
      onClick={() => navigate(-1)}
    >
      <ArrowLongLeftIcon className="size-6" />
    </button>
  );
}
