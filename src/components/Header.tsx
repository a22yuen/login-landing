import { useRouter } from "next/router";
import Head from "next/head";
export default function Header() {
  const router = useRouter();
  const itemClass = "text-lg cursor-pointer mx-auto px-4 text-white transform transition duration-500 hover:scale-110"
  const loginHighlight = router.pathname == "/" ? " underline" : ""
  const detailsHighlight = router.pathname == "/details" ? " underline" : ""

  const click = (path: string) => {
    if (path == "login" && router.pathname != "/") {
      router.push("/");
    } else if (path == "details" && router.pathname != "/details") {
      router.push("/details");
    }
  }

  const title = (router.pathname == "/" ? "Login" : "Details") + " Page"

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-800 grid gap-4 grid-cols-2 text-center py-3 ">
        <div onClick={() => {click("login")}} className={itemClass + loginHighlight}>Login</div>
        <div onClick={() => {click("details")}} className={itemClass + detailsHighlight}>Details</div>
      </div>
    </>
  );
}
