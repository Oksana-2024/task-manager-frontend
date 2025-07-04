import s from "./OverlayLoader.module.css"
interface OverlayLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const OverlayLoader = ({ isLoading, children }: OverlayLoaderProps) => {
  return (
    <div className={s.relative}>
      {children}
      {isLoading && (
        <div className={s.overlay}>
          <div className={s.spinner} />
        </div>
      )}
    </div>
  );
};