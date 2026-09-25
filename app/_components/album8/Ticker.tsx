const items = [
  '정규 8집 〈모두가 아는 이야기〉',
  '2026. 10. 23 FRI 12PM 발매',
  '2nd Single 〈멜랑콜리아〉 09. 29 TUE 12PM',
  '1st Single 〈박쥐〉 Out Now',
  '22th Yellow Concert — Seoul 10. 31 · Busan 12. 05',
  '텀블벅 펀딩 진행 중 ~ 10. 11',
];

export default function Ticker() {
  const row = [...items, ...items];
  return (
    <div
      className="relative z-10 overflow-hidden border-y border-cream/10 bg-ink-2 py-3 text-cream"
      aria-label="주요 일정"
    >
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 px-6 text-xs font-medium tracking-[0.18em] uppercase md:text-sm"
            aria-hidden={i >= items.length}
          >
            <span className={i % 2 === 0 ? 'text-cream/90' : 'text-cream/60'}>{item}</span>
            <span className="text-bulb" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
