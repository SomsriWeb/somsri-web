import type { Meta, StoryObj } from '@storybook/vue3';
import PriceCarousel from './PriceCarousel.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PriceCarousel',
    component: PriceCarousel,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PriceCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PriceCarouselStory: Story = {
    args: {
        id: ''
    },
};
