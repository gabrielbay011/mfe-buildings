// Carousel.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import buttonAdvance from "../../public/images/button-advance.svg";
import imageBuilding from "../../public/images/foto-edificio.png";

type CarouselProps = {
  items: string[];
};

export default function Carousel({ items }: CarouselProps) {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={25}
        slidesPerView={4} // Altere para o número de slides que deseja ver
        navigation={{
          nextEl: ".custom-next",
        }}
        loop={true}
        className="!px-6"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-purpleMedium rounded-[22.4px] p-0.5 hover:bg-purpleOutro hover:shadow-lg hover:shadow-purpleMedium">
              <div className="group h-90 bg-purpleMedium border-5 border-purpleMedium rounded-[22.4px] overflow-hidden relative cursor-pointer">
                <img
                  src={imageBuilding}
                  alt={item}
                  className="absolute inset-0 w-full h-full object-cover z-10 group-hover:z-20"
                />
                <div className="absolute inset-0 flex items-end justify-center z-20 group-hover:z-10 transition-all duration-300">
                  <div className="bg-purpleMedium text-white text-center w-full py-5 px-4 text-xl font-semibold">
                    {item}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 cursor-pointer">
        <img src={buttonAdvance} alt="Icone Avançar" />
      </button>
    </div>
  );
}
