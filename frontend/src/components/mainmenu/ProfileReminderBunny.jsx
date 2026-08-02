export default function ProfileReminderBunny({ onGoToProfile }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-[28px] bg-[#FBEEC9] p-6 text-center shadow-2xl">
        <img src="/bunny-pointing.png" alt="" className="mx-auto h-34 w-28" />
        <p className="mt-3 text-lg font-black text-[#4a3b2a]">
          Let's fill in your profile first!
        </p>
        <p className="mt-1 text-sm font-semibold text-[#8a7a5a]">
          Ask a grown-up to help you finish it.
        </p>
        <button
          type="button"
          onClick={onGoToProfile}
          className="mt-5 w-full rounded-2xl bg-[#6754B7] px-5 py-3 text-sm font-black text-white"
        >
          Fill My Profile
        </button>
      </div>
    </div>
  );
}