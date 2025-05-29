'use client'

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-3xl font-bold mb-4">About Keeper Notes</h1>
      <p className="mb-4 text-gray-700">
        Keeper Notes is a simple and efficient note-taking app designed to help you quickly jot down ideas, tasks, and reminders.
      </p>
      <p className="mb-4 text-gray-700">
        Built with Next.js and Tailwind CSS, it offers seamless navigation and a clean interface to keep your notes organized. You can create, edit, and delete notes effortlessly.
      </p>
      <p className="mb-4 text-gray-700">
        This app is a frontend-only project showcasing React state management and routing techniques, with an easy-to-use authentication flow.
      </p>
      <p className="text-gray-700">
        Thank you for using Keeper Notes — your digital notebook to keep your thoughts and ideas safe!
      </p>
    </main>
  )
}
