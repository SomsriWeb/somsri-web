import type { Meta, StoryObj } from '@storybook/vue3';
import PantSize from './PantSize.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PantSize',
    component: PantSize,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PantSize>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PantSizeStory: Story = {
    args: {},
};
