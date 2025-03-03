import Todo from './contact/Todo';
import AppointmentForm from './contact/AppointmentForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Todo />
        <AppointmentForm />
      </div>
    </main>
  );
} 