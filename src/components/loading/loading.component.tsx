import Pokeball from '../../assets/pokeball.png';
import './loading.css';
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <img
        src={Pokeball}
        className="pokeball max-w-100 w-[300px]"
        alt="pokeball"
      />
    </div>
  );
};
export default Loading;
