interface Benefit {
  icon: React.ReactNode;
  title: string;
}

const benefits: Benefit[] = [
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.33337 21.0166H31.6667"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M31.6667 17.1332V29.0498C31.6167 33.7998 30.3167 34.9998 25.3667 34.9998H9.63342C4.60009 34.9998 3.33337 33.7498 3.33337 28.7832V17.1332C3.33337 12.6332 4.38337 11.1832 8.33337 10.9498C8.73337 10.9332 9.16676 10.9165 9.63342 10.9165H25.3667C30.4 10.9165 31.6667 12.1665 31.6667 17.1332Z"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36.6667 11.2167V22.8667C36.6667 27.3667 35.6167 28.8167 31.6667 29.05V17.1333C31.6667 12.1667 30.4 10.9167 25.3667 10.9167H9.63342C9.16676 10.9167 8.73337 10.9333 8.33337 10.95C8.38337 6.2 9.68342 5 14.6334 5H30.3667C35.4 5 36.6667 6.25 36.6667 11.2167Z"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 29.6831H11.6166"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.1833 29.6831H20.9167"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "ნაწილ ნაწილ გადახდა",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.64816 24.4339L4.11484 21.9005C3.08151 20.8672 3.08151 19.1672 4.11484 18.1338L6.64816 15.6005C7.08149 15.1671 7.43149 14.3171 7.43149 13.7171V10.1338C7.43149 8.6671 8.6315 7.46714 10.0982 7.46714H13.6815C14.2815 7.46714 15.1315 7.11719 15.5648 6.68385L18.0982 4.15049C19.1315 3.11715 20.8315 3.11715 21.8648 4.15049L24.3982 6.68385C24.8315 7.11719 25.6815 7.46714 26.2815 7.46714H29.8649C31.3315 7.46714 32.5315 8.6671 32.5315 10.1338V13.7171C32.5315 14.3171 32.8815 15.1671 33.3148 15.6005L35.8482 18.1338C36.8815 19.1672 36.8815 20.8672 35.8482 21.9005L33.3148 24.4339C32.8815 24.8672 32.5315 25.7172 32.5315 26.3172V29.9004C32.5315 31.3671 31.3315 32.5672 29.8649 32.5672H26.2815C25.6815 32.5672 24.8315 32.9172 24.3982 33.3505L21.8648 35.8839C20.8315 36.9172 19.1315 36.9172 18.0982 35.8839L15.5648 33.3505C15.1315 32.9172 14.2815 32.5672 13.6815 32.5672H10.0982C8.6315 32.5672 7.43149 31.3671 7.43149 29.9004V26.3172C7.43149 25.7006 7.08149 24.8506 6.64816 24.4339Z"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 25L25 15"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.1574 24.1668H24.1724"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8242 15.8333H15.8391"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "ფასდაკლებები და აქციები",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 23.3335H21.6667C23.5 23.3335 25 21.8335 25 20.0002V3.3335H10C7.5 3.3335 5.31668 4.71681 4.18335 6.75014"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33325 28.3335C3.33325 31.1002 5.56659 33.3335 8.33325 33.3335H9.99992C9.99992 31.5002 11.4999 30.0002 13.3333 30.0002C15.1666 30.0002 16.6666 31.5002 16.6666 33.3335H23.3333C23.3333 31.5002 24.8333 30.0002 26.6666 30.0002C28.4999 30.0002 29.9999 31.5002 29.9999 33.3335H31.6666C34.4333 33.3335 36.6666 31.1002 36.6666 28.3335V23.3335H31.6666C30.7499 23.3335 29.9999 22.5835 29.9999 21.6668V16.6668C29.9999 15.7502 30.7499 15.0002 31.6666 15.0002H33.8165L30.9666 10.0168C30.3666 8.98351 29.2666 8.3335 28.0666 8.3335H24.9999V20.0002C24.9999 21.8335 23.4999 23.3335 21.6666 23.3335H19.9999"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3333 36.6667C15.1743 36.6667 16.6667 35.1743 16.6667 33.3333C16.6667 31.4924 15.1743 30 13.3333 30C11.4924 30 10 31.4924 10 33.3333C10 35.1743 11.4924 36.6667 13.3333 36.6667Z"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.6666 36.6667C28.5075 36.6667 29.9999 35.1743 29.9999 33.3333C29.9999 31.4924 28.5075 30 26.6666 30C24.8256 30 23.3333 31.4924 23.3333 33.3333C23.3333 35.1743 24.8256 36.6667 26.6666 36.6667Z"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36.6667 20V23.3333H31.6667C30.75 23.3333 30 22.5833 30 21.6667V16.6667C30 15.75 30.75 15 31.6667 15H33.8166L36.6667 20Z"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33325 13.3335H13.3333"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33325 18.3335H9.99992"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33325 23.3335H6.66659"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "მიწოდება ქვეყნის მასშტაბით",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36.6666 20.0002C36.6666 29.2002 29.1999 36.6668 19.9999 36.6668C10.7999 36.6668 3.33325 29.2002 3.33325 20.0002C3.33325 10.8002 10.7999 3.3335 19.9999 3.3335C29.1999 3.3335 36.6666 10.8002 36.6666 20.0002Z"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.1833 25.2999L21.0166 22.2166C20.1166 21.6833 19.3833 20.3999 19.3833 19.3499V12.5166"
          stroke="#9A9A9A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "სრული მხარდაჭერა",
  },
];

export default function BenefitsList() {
  return (
    <div className="customContiner mt-12 w-full px-5 pb-10 md:px-0 md:pb-18">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-background-secondary flex h-[166px] flex-col items-center rounded-lg p-6 text-center md:h-[128px]"
          >
            <div className="mb-4 flex items-center justify-center">
              {benefit.icon}
            </div>
            <p className="text-dark-secundary-100 text-sm leading-5 font-medium">
              {benefit.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
