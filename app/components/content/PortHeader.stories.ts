import type { Meta, StoryObj } from '@storybook/vue3';
import PortHeader from './PortHeader.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PortHeader',
    component: PortHeader,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PortHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PortHeaderStory: Story = {
    args: {
    
    },
};
