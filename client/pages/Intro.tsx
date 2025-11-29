import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-play: transition to loading screen after 3 seconds
    const timer = setTimeout(() => {
      navigate("/loading");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#32402F] flex flex-col items-center justify-between py-12 px-6">
      {/* FitFlow Logo at top */}
      <div className="pt-16">
        <h1 className="font-display text-5xl font-normal text-black text-center">
          FitFlow
        </h1>
      </div>

      {/* FitFlow SVG text in middle - positioned lower */}
      <div className="flex-1 flex items-center justify-center">
        <svg
          width="94"
          height="18"
          viewBox="0 0 94 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-sm w-full"
        >
          <path
            d="M0 0.888H13.344V4.848H5.304V7.68H12.216V11.472H5.304V17.4H0V0.888Z"
            fill="black"
          />
          <path
            d="M15.5998 3.24V0H20.3758V3.24H15.5998ZM15.5998 17.4V4.728H20.3758V17.4H15.5998Z"
            fill="black"
          />
          <path
            d="M31.632 4.728V7.968H28.944V12.792C28.944 13.368 29.04 13.792 29.232 14.064C29.424 14.32 29.776 14.448 30.288 14.448H31.632V17.256C31.248 17.384 30.752 17.488 30.144 17.568C29.536 17.648 29.008 17.688 28.56 17.688C27.152 17.688 26.064 17.432 25.296 16.92C24.544 16.408 24.168 15.536 24.168 14.304V7.968H22.392V4.728H24.36L25.392 0.888H28.944V4.728H31.632Z"
            fill="black"
          />
          <path
            d="M33.9441 0.888H47.2881V4.848H39.2481V7.68H46.1601V11.472H39.2481V17.4H33.9441V0.888Z"
            fill="black"
          />
          <path d="M49.7314 17.4V0H54.5074V17.4H49.7314Z" fill="black" />
          <path
            d="M63.8676 4.44C66.0916 4.44 67.8356 5.008 69.0996 6.144C70.3796 7.264 71.0196 8.904 71.0196 11.064C71.0196 13.224 70.3796 14.872 69.0996 16.008C67.8356 17.128 66.0916 17.688 63.8676 17.688C61.6436 17.688 59.8996 17.128 58.6356 16.008C57.3716 14.888 56.7396 13.24 56.7396 11.064C56.7396 8.888 57.3716 7.24 58.6356 6.12C59.8996 5 61.6436 4.44 63.8676 4.44ZM63.8676 7.68C62.2996 7.68 61.5156 8.584 61.5156 10.392V11.76C61.5156 13.552 62.2996 14.448 63.8676 14.448C65.4516 14.448 66.2436 13.552 66.2436 11.76V10.392C66.2436 8.584 65.4516 7.68 63.8676 7.68Z"
            fill="black"
          />
          <path
            d="M84.5655 17.4L82.5975 10.344H82.5015L80.5095 17.4H75.8535L71.2215 4.728H76.3575L78.2775 12.216H78.4455L80.4375 4.728H85.1895L87.1095 12.216H87.2775L89.2215 4.728H93.8775L89.2215 17.4H84.5655Z"
            fill="black"
          />
        </svg>
      </div>

      {/* Example of our opening text at bottom */}
      <div className="pb-8 text-center">
        <p className="text-white text-lg font-light leading-relaxed max-w-xs">
          Example of our opening
        </p>
      </div>
    </div>
  );
}
