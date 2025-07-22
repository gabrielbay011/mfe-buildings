export default function CardEquipment({ label, qtyEquipment, image, ...rest }) {
  return (
    <button
      {...rest}
      className="h-28 lg:w-50 xl:w-53 flex flex-row gap-5 bg-white rounded-[20px] shadow-lg items-center hover:border hover:border-purpleMedium cursor-pointer"
    >
      <div className="text-left ml-4">
        <img src={image} alt="Icone Equipamento" className="w-full h-full" />
      </div>
      <div className="text-left">
        <p className="text-grayMedium text-[20px]">{label}</p>
        <p className="font-semibold text-3xl text-purpleMedium">
          {qtyEquipment}
        </p>
      </div>
    </button>
  );
}
