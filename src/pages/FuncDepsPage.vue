<script setup lang="ts">
import Card from "primevue/card";
import Message from "primevue/message";
import Textarea from "primevue/textarea";
import { computed, ref } from "vue";
import Title from "../components/Title.vue";

const text = ref("");
const regex = /^[A-Za-z]+->[A-Za-z]+$/;
const parsed = computed(() => {
  return text.value.split("\n").map((line) => line.replace(/\s/g, ""));
});
const isErrored = computed(() => {
  if (isEditing.value) return false;
  if (!text.value.trim()) return false;
  return parsed.value.some((line) => !(line && regex.test(line)));
});
const latex = computed(() => {
  return parsed.value
    .filter((line) => line && regex.test(line))
    .map((line) => line.split("->"))
    .map(([lhs, rhs]) => {
      const left = `\\{${lhs.split("").join(", ")}\\}`;
      const right = `\\{${rhs.split("").join(", ")}\\}`;
      return `${left} \\rarr ${right}`;
    });
});
const attributes = computed(() => {
  const charset = parsed.value
    .filter((line) => line && regex.test(line))
    .flatMap((line) => line.replace(/->/g, "").split(""));
  return [...new Set(charset)].sort();
});

const isEditing = ref(false);
</script>

<template>
  <Title title="Functional Dependencies" />
  <div class="box">
    <div class="col">
      <Textarea
        class="textarea"
        v-model="text"
        rows="12"
        :auto-resize="true"
        placeholder="Enter functional dependencies here..."
        @input="isEditing = true"
        v-debounce:1s="() => (isEditing = false)"
        :debounce-events="'input'"
      />
      <Message
        class="error"
        :closable="false"
        severity="error"
        v-if="isErrored"
      >
        <span>
          Invalid input. Each line should follow the format:
          <code>ABC->DEF</code>.
        </span>
      </Message>
    </div>
    <div class="col">
      <Card class="card">
        <template #content>
          <ul>
            <p><strong>Detected Attributes</strong></p>
            <div v-html="$latex(`\\{${attributes.join(', ')}\\}`)"></div>
            <p><strong>Detected Dependencies</strong></p>
            <li v-for="line in latex">
              <span v-html="$latex(line)" />
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.col {
  width: 100%;
  align-self: stretch;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
}

.textarea {
  width: 100%;
}
.error {
  margin: 0;
  width: 100%;
}

.card {
  width: 100%;
  height: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
