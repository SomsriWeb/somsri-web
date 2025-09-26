import type { Meta, StoryObj } from '@storybook/vue3';
import PortCard from './PortCard.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PortCard',
    component: PortCard,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PortCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PortCardStory: Story = {
    args: {
        type: 'portCardArtist'
    },
};
