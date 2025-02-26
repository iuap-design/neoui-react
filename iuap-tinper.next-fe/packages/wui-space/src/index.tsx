import InternalSpace from './Space';
import Compact from './compact';

type InternalSpaceType = typeof InternalSpace;
interface SpaceInterface extends InternalSpaceType{
    Compact: typeof Compact;
}
const Space = InternalSpace as SpaceInterface;
Space.Compact = Compact;

export default Space;
