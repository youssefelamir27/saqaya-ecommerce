import { shallowMount } from '@vue/test-utils';
import ContactForm from '@/components/Contact/ContactForm.vue';

describe('ContactForm.vue', () => {
  it('renders name and email inputs', () => {
    const wrapper = shallowMount(ContactForm);
    const inputs = wrapper.findAll('.contact__input');
    expect(inputs.length).toBe(2);
  });

  it('renders message textarea', () => {
    const wrapper = shallowMount(ContactForm);
    expect(wrapper.find('.contact__textarea').exists()).toBe(true);
  });

  it('renders submit button with correct text', () => {
    const wrapper = shallowMount(ContactForm);
    expect(wrapper.find('.contact__submit-btn').text()).toBe('Send Message');
  });

  it('shows alert when submitting with empty fields', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = shallowMount(ContactForm);
    // cast to any to access component methods and data
    await (wrapper.vm as any).handleSubmit();
    expect(alertMock).toHaveBeenCalledWith('Please fill in all fields.');
    alertMock.mockRestore();
  });

  it('does not emit submit when fields are empty', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = shallowMount(ContactForm);
    await (wrapper.vm as any).handleSubmit();
    expect(wrapper.emitted('submit')).toBeFalsy();
  });

  it('emits submit with correct form data when all fields filled', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = shallowMount(ContactForm);
    (wrapper.vm as any).localForm = { name: 'Youssef', email: 'y@test.com', message: 'Hello' };
    await (wrapper.vm as any).handleSubmit();
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')![0][0]).toEqual({
      name: 'Youssef',
      email: 'y@test.com',
      message: 'Hello',
    });
  });

  it('resets form to empty after successful submit', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = shallowMount(ContactForm);
    (wrapper.vm as any).localForm = { name: 'Youssef', email: 'y@test.com', message: 'Hello' };
    await (wrapper.vm as any).handleSubmit();
    expect((wrapper.vm as any).localForm).toEqual({ name: '', email: '', message: '' });
  });

  it('does not emit when only name is filled', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = shallowMount(ContactForm);
    (wrapper.vm as any).localForm = { name: 'Youssef', email: '', message: '' };
    await (wrapper.vm as any).handleSubmit();
    expect(wrapper.emitted('submit')).toBeFalsy();
  });
});