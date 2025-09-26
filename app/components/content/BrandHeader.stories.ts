import type { Meta, StoryObj } from '@storybook/vue3';
import BrandHeader from './BrandHeader.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/BrandHeader',
    component: BrandHeader,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof BrandHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandHeaderStory: Story = {
    args: {},
};
