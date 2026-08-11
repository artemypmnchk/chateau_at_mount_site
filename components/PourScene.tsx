/**
 * Сцена розлива в гравюрной манере: волосяные линии разной толщины, силуэт
 * бордоской бутылки с вытянутым горлышком и плечиком, бокал-тюльпан на
 * тонкой ножке со стопой-эллипсом. Торцы линий прямые, стыки острые — так
 * рисует резец, а не фломастер.
 *
 * Движется жидкость, а не посуда: бутылка лишь слегка кренится над бокалом,
 * из горлышка идёт струя, уровень в бутылке падает, в бокале растёт и мягко
 * оседает. Поверхность вина в бутылке контр-вращается тем же таймингом,
 * поэтому в кадре она всегда горизонтальна.
 *
 * Запускается, когда финал въезжает в экран (класс .is-in от useReveal).
 */
export function PourScene() {
  return (
    <span className="ab-pour" aria-hidden>
      <svg viewBox="0 0 130 110" className="ab-pour-svg">
        <defs>
          <clipPath id="ab-bowl-clip">
            <path d="M79.4 36 C79.8 54 85 63.5 93 66.6 C101 63.5 106.2 54 106.6 36 Z" />
          </clipPath>
          <clipPath id="ab-bottle-clip">
            <path d="M24 98 L24 58.5 C24 50 31 47 32 41 L32 20 L36 20 L36 41 C37 47 44 50 44 58.5 L44 98 Z" />
          </clipPath>
        </defs>

        {/* Бокал-тюльпан */}
        <g className="ab-pour-glass">
          <g clipPath="url(#ab-bowl-clip)">
            <g className="ab-glass-wine">
              <rect x="74" y="34" width="38" height="42" />
              {/* кромка вина — тонкая тёмная линия по поверхности */}
              <path className="ab-meniscus" d="M74 34 L112 34" />
            </g>
          </g>
          <path className="ab-ln" d="M78 34 L108 34" />
          <path
            className="ab-ln-fine"
            d="M78 34 C78 54 84 65 93 68 C102 65 108 54 108 34"
          />
          <path className="ab-ln-fine" d="M93 68 L93 94" />
          <ellipse className="ab-ln-fine" cx="93" cy="95.4" rx="11" ry="2.6" />
        </g>

        {/* Струя из горлышка */}
        <path className="ab-pour-stream" d="M86 25 Q88 32 90.5 40" />

        {/* Бутылка: бордоский силуэт, вино внутри видно */}
        <g className="ab-pour-bottle">
          <g clipPath="url(#ab-bottle-clip)">
            <g className="ab-bottle-wine">
              <rect x="-150" y="44" width="350" height="350" />
            </g>
          </g>
          <path
            className="ab-ln"
            d="M22 100 L22 58 C22 49 29 46 30 40 L30 18 L38 18 L38 40 C39 46 46 49 46 58 L46 100 Z"
          />
          <path className="ab-ln" d="M28.6 18 L39.4 18" />
          <path className="ab-ln-fine" d="M30 25.5 L38 25.5" />
          <path className="ab-ln-hair" d="M22.8 68 L45.2 68" />
          <path className="ab-ln-hair" d="M22.8 84 L45.2 84" />
        </g>
      </svg>
    </span>
  );
}
