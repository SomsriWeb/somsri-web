import type { Meta, StoryObj } from '@storybook/vue3';
import PoloHeader from './PoloHeader.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'Components/PoloHeader',
    component: PoloHeader,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof PoloHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PoloHeaderStory: Story = {
    args: {
        actionLink:''
    },
};
