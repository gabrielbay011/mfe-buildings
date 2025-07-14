import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import buttonAdvance from "../../../public//images/button-advance.svg";
import { Building } from "../../utils/types/building-type";
import { useNavigate } from "react-router-dom";

type Props = {
  building: Building[];
};

export default function Carousel({ building }: Props) {
  const navigate = useNavigate();

  if (building.length === 0) {
    return (
      <div className="rounded-[20px] bg-white shadow-lg border border-grayDark text-center p-10">
        Você ainda não tem nenhum edifício cadastrado
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: ".custom-next",
        }}
        loop={true}
        className="!px-6"
      >
        {building.map((building, index) => (
          <SwiperSlide key={index}>
            <div className="mb-5">
              <button
                type="button"
                onClick={() => navigate(`/profile/${building.id}`)}
                className="bg-purpleMedium rounded-[22.4px] p-0.5 hover:bg-purpleOutro hover:shadow-lg hover:shadow-purpleMedium w-full text-left"
              >
                <div className="group h-90 bg-purpleMedium border-5 border-purpleMedium rounded-[22.4px] overflow-hidden relative cursor-pointer">
                  <img
                    src={building.photo}
                    alt={building.name}
                    className="absolute inset-0 w-full h-full object-cover z-10 group-hover:z-20"
                  />
                  <div className="absolute inset-0 flex items-end justify-center z-20 group-hover:z-10 transition-all duration-300">
                    <div className="bg-purpleMedium text-white text-center w-full py-5 px-4 text-xl font-semibold">
                      {building.name}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-next absolute top-1/2 -right-6.5 -translate-y-9 z-10 cursor-pointer">
        <img src={buttonAdvance} alt="Icone Avançar" className="w-[70%]" />
      </button>
    </div>
  );
}
