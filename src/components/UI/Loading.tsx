import styles from "./Loder.module.css"
const Loading = () => {
  return (
    <div className=" h-screen bg-black/10 fixed inset-0 backdrop-blur-md z-[999] flex justify-center items-center">
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loading;
