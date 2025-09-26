import type { Meta, StoryObj } from '@storybook/vue3';
import PortSubHeader from './PortSubHeader.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PortSubHeader',
    component: PortSubHeader,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PortSubHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PortSubHeaderStory: Story = {
    args: {

    },
};
