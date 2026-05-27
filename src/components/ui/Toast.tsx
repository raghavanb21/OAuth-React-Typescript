import { useToast } from '../../context/ToastContext';
import s from './Toast.module.css';

export function Toast() {
  const { toast } = useToast();
  return (
    <div
      className={[
        s.toast,
        toast.visible ? s.show : '',
        toast.type === 'error' ? s.error : '',
      ].join(' ')}
    >
      {toast.message}
    </div>
  );
}
