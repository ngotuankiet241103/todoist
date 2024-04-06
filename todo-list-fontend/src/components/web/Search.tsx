import IconMenu from './IconMenu';
import useTheme from '../../hooks/useTheme';
import { hoverMode } from '../../utils/theme';

const Search = ({onClick} : {onClick: () => void}) => {
    const {theme} = useTheme();
    return (
        <div className={`flex gap-4 p-2 items-center ${hoverMode[theme.mode]()}`} onClick={onClick}>
            <IconMenu icon='fa-solid fa-magnifying-glass'></IconMenu>
            <span>Search</span>
        </div>
    );
};

export default Search;