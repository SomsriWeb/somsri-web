import type { Meta, StoryObj } from '@storybook/vue3';
import TshirtSize from './TshirtSize.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/TshirtSize',
    component: TshirtSize,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof TshirtSize>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TshirtSizeStory: Story = {
    args: {},
};
