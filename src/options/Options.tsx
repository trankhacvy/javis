import { FormEvent, useState } from "react";
import logo from "@assets/img/javis-logo-160.png";

export default function Options(): JSX.Element {
  const [key, setKey] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!key) return;
    await chrome.storage.local.set({ openAIKey: key });
    setSuccess(true);
  };

  return (
    <div className="jv-w-full jv-min-h-screen jv-text-gray-800">
      <header className="jv-fixed jv-top-0 jv-left-0 jv-right-0">
        <div className="jv-h-16 jv-min-h-[64px] jv-px-6 jv-flex jv-items-center jv-justify-between">
          <a href="/">
            <div className="jv-w-10 jv-h-10 jv-rounded-md">
              <img src={logo} className="jv-w-full jv-h-full jv-object-cover" />
            </div>
          </a>
          <a href="/">
            <span className="jv-font-semibold">Need help?</span>
          </a>
        </div>
      </header>
      <main className="jv-w-full jv-px-6 jv-mx-auto">
        <div className="jv-max-w-[400px] jv-min-h-screen jv-text-center jv-mx-auto jv-py-24 jv-flex jv-flex-col jv-items-center jv-justify-center">
          <div className="jv-mb-10">
            <div className="jv-w-24 jv-h-24 jv-rounded-lg jv-overflow-hidden">
              <img src={logo} className="jv-w-full jv-h-full jv-object-cover" />
            </div>
          </div>
          <h2 className="jv-text-4xl jv-font-bold jv-mb-4">
            {success ? "Congratulations!" : "Settings"}
          </h2>
          <p className="jv-mb-10">
            {success ? (
              <>
                Token Saved Successfully
                <br /> you are now ready to use Javis.
              </>
            ) : (
              "Your API key is securely stored on your local machine and never sent to our server."
            )}
          </p>
          {!success && (
            <form className="jv-w-full" onSubmit={handleSave}>
              <input
                type="text"
                id="key"
                className="input jv-w-full"
                placeholder="Enter your API key here."
                required
                value={key}
                onChange={(event) => setKey(event.target.value)}
              />
              <button type="submit" className="btn-primary jv-mt-6 jv-w-full">
                Save
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
