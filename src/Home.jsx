import { Transition } from 'react-transition-group';
import { useRef } from 'react';
import PropTypes from 'prop-types';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

function Home({ in: inProp }) {
    const nodeRef = useRef(null);
    return (
        <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
            {state => (
                <div
                    ref={nodeRef}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                    }}
                >
                    Im a fade Transition!
                </div>
            )}
        </Transition>
    );
}

Home.propTypes = {
    in: PropTypes.bool.isRequired,
};

export default Home;
