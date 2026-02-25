import { redirect } from 'next/navigation';

// Root page always redirects to landing
export default function RootPage() {
  redirect('/landing');
}