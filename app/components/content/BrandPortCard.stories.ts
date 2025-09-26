import type { Meta, StoryObj } from '@storybook/vue3';
import BrandPortCard from './BrandPortCard.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/BrandPortCard',
    component: BrandPortCard,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof BrandPortCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandPortCardStory: Story = {
    args: {},
};
