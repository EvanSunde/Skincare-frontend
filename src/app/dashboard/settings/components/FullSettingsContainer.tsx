import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import SettingsSidebar from "./SettingsSidebar";

interface FullSettingContainerProps {
    activeSettingButton: string;
    setActiveSettingButton: React.Dispatch<React.SetStateAction<string>>;
    windowWidth: number;
}

const FullSettingContainer: React.FC<FullSettingContainerProps> = ({ activeSettingButton, setActiveSettingButton, windowWidth }) => {
    return (
        <div className='w-full  h-auto min-h-[80vh]  lg:min-h-auto lg:h-[47rem] rounded-[10px] flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-4 2xl:gap-x-8 py-5 lg:py-0 mb-24 lg:mb-0'
            style={{ backgroundColor: 'rgba(192, 192, 192, 0.3)', backdropFilter: 'blur(5px)' }}>
            <SettingsSidebar activeSettingButton={activeSettingButton} setActiveSettingButton={setActiveSettingButton} windowWidth={windowWidth} />
            <EditProfile activeSettingButton={activeSettingButton} setActiveSettingButton={setActiveSettingButton} windowWidth={windowWidth} />
            <ChangePassword activeSettingButton={activeSettingButton} setActiveSettingButton={setActiveSettingButton} />
        </div>
    )
};

export default FullSettingContainer;
