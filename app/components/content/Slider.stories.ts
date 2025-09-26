import type { Meta, StoryObj } from '@storybook/vue3';
import Slider from './Slider.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/Slider',
    component: Slider,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SliderStory: Story = {
    args: {
        items: 1,
    },
};
