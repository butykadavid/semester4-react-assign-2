import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl mb-10">Hoppácska!</h1>
      <p>Sajnáljuk, valami hiba történt:</p>
      <p className="mt-2 text-gray-400">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}