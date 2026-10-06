import { redirect } from 'next/navigation';
export default function DummyPage() {
  redirect('/');
  return null;
}
