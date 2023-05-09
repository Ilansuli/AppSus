export default {
    props: ['label'],
    template: `
        <form name="contact" class="contact-inform form">    
            <div class="form-control">
				<input type="email" name="form-input" class="form-input" placeholder="none" required>
				<label for="form-input" class="form-label">Email</label>
	        </div>
        </form>
    `,
}

