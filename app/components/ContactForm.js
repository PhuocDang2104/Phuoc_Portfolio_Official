// app/components/ContactForm.js

export default function ContactForm() {
  return (
    <section
        className="content reveal"
        id="contact"
        aria-labelledby="contact-title"
    >
        <h2 className="section-title" id="contact-title">
        Contact
    </h2>

      <div className="contact-card">
        <div className="contact-grid">
          {/* Cột trái: info */}
          <div>
            <p className="muted">
              Email:{' '}
              <a
                href="mailto:phuoc.dang2104@gmail.com"
                className="link-normal"
              >
                phuoc.dang2104@gmail.com
              </a>
            </p>
            <p className="muted">
              GitHub:{' '}
              <a
                href="https://github.com/PhuocDang2104"
                target="_blank"
                rel="noreferrer"
                className="link-normal"
              >
                PhuocDang2104
              </a>
            </p>
            <p className="muted">
              LinkedIn:{' '}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="link-normal"
              >
                Phuoc Dang
              </a>
            </p>

            <div className="contact-buttons">
              <a
                className="btn btn-primary"
                href="/Dang Nhu Phuoc _ CV _ Embedded Engineer.pdf"
                download
              >
                Download CV
              </a>
              <a
                className="btn btn-ghost"
                href="mailto:phuoc.dang2104@gmail.com"
              >
                Email me
              </a>
            </div>
          </div>

          {/* Cột phải: form gửi mail (web tĩnh) */}
          <div>
            {/* 
              Dùng FormSubmit để web tĩnh vẫn gửi mail được.
              Lần đầu FormSubmit sẽ gửi mail xác nhận cho bạn.
            */}
            <form
              action="https://formsubmit.co/phuoc.dang2104@gmail.com"
              method="POST"
            >
              {/* config ẩn */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />
              <input
                type="hidden"
                name="_subject"
                value="New message from portfolio"
              />

              <label className="muted small" htmlFor="subject">
                Short message
              </label>
              <input
                id="subject"
                name="subject"
                placeholder="Subject"
                required
              />

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Message..."
                required
              />

              <div style={{ marginTop: '8px' }}>
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
