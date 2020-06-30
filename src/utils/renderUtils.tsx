const RenderUtils = {
    isSSR: (window: Window) => typeof window !== 'undefined',
};

export default RenderUtils;
