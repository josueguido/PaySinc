export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t text-center text-gray-600 text-sm py-4 mt-auto">
       PaySinc App developed by Josue Guido © {new Date().getFullYear()}
      <p className="font-semibold mt-1">Version 1.0.0</p>
    </footer>
  );
}
