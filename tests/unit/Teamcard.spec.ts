import { shallowMount } from '@vue/test-utils';
import TeamCard from '@/components/About/TeamCard.vue';

const mockMember = {
  name: 'Youssef Elamir',
  role: 'Frontend Developer',
  image: 'https://cdn.dummyjson.com/icon/1.webp',
};

describe('TeamCard.vue', () => {
  it('renders member name correctly', () => {
    const wrapper = shallowMount(TeamCard, { propsData: { member: mockMember } });
    expect(wrapper.find('h3').text()).toBe('Youssef Elamir');
  });

  it('renders member role correctly', () => {
    const wrapper = shallowMount(TeamCard, { propsData: { member: mockMember } });
    expect(wrapper.find('.team__role').text()).toBe('Frontend Developer');
  });

  it('renders member image with correct src', () => {
    const wrapper = shallowMount(TeamCard, { propsData: { member: mockMember } });
    expect(wrapper.find('img').attributes('src')).toBe(mockMember.image);
  });

  it('renders member image with correct alt', () => {
    const wrapper = shallowMount(TeamCard, { propsData: { member: mockMember } });
    expect(wrapper.find('img').attributes('alt')).toBe('Youssef Elamir');
  });

  it('renders 3 social icons', () => {
    const wrapper = shallowMount(TeamCard, { propsData: { member: mockMember } });
    expect(wrapper.findAll('.team__social-icon').length).toBe(3);
  });

  it('renders facebook, instagram and linkedin icons', () => {
    const wrapper = shallowMount(TeamCard, { propsData: { member: mockMember } });
    const html = wrapper.html();
    expect(html).toContain('fa-facebook');
    expect(html).toContain('fa-instagram');
    expect(html).toContain('fa-linkedin');
  });
});